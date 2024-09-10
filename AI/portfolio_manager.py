import pandas as pd
import requests, math
import matplotlib.pyplot as plt
from scipy.optimize import minimize
import numpy as np
from datetime import datetime, timedelta
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

import nltk
nltk.download('vader_lexicon')
nltk.download('punkt_tab')
nltk.download('wordnet')
nltk.download('stopwords')

def fetch_market_data(asset):
    now = datetime.timestamp(datetime.now())
    past = datetime.timestamp(datetime.now() - timedelta(days=31))
    history_url = f"https://api.coingecko.com/api/v3/coins/{asset}/market_chart/range?vs_currency=usd&from={past}&to={now}&precision=2"
    # cap_url = "https://pro-api.coingecko.com/api/v3/global"
    headers = {
        "accept": "application/json",
        "CG-Ku3YXeJ8YooAqzJnb2G3VN9S": asset
    }

    history_response = requests.get(history_url, headers=headers)
    # cap_response = requests.get(cap_url, headers=headers)
    data = history_response.json()['prices']
    df = pd.DataFrame(data, columns=['timestamp','price'])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    df.set_index('timestamp', inplace=True)
    return df

def preprocess_text(text):
    # Tokenize the text
    tokens = word_tokenize(text.lower())
    # Remove stop words
    filtered_tokens = [token for token in tokens if token not in stopwords.words('english')]
    # Lemmatize the tokens
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in filtered_tokens]
    # Join the tokens back into a string
    processed_text = ' '.join(lemmatized_tokens)
    return processed_text

def get_sentiment(tweets):
    scores = []
    for tweet in tweets:
            processed_tweet = preprocess_text(tweet)
            score = SentimentIntensityAnalyzer().polarity_scores(processed_tweet)
            scores.append(score['compound'])
    return np.mean(scores)

# Mean-Variance Optimization (MVO) using Black-Litterman returns
def portfolio_variance(weights, cov_matrix):
    return weights.T @ cov_matrix @ weights

def portfolio_return(weights, returns):
    return np.dot(weights, returns)

def mvo_optimizer(expected_returns, cov_matrix):
    num_assets = len(expected_returns)
    args = (expected_returns,cov_matrix)
    constraints = ({'type': 'eq', 'fun': lambda x: np.sum(x) - 1})
    bounds = tuple((0, 1) for _ in range(num_assets))
    initial_guess = num_assets * [1. / num_assets,]

    def neg_sharpe_ratio(weights, expected_returns, cov_matrix):
        returns = portfolio_return(weights, expected_returns)
        variance = portfolio_variance(weights, cov_matrix)
        return -returns / np.sqrt(variance)

    result = minimize(neg_sharpe_ratio, initial_guess, args=args,
                      method='SLSQP', bounds=bounds, constraints=constraints)

    return result.x

def get_optimal_weights(cryptos):
     
     # get the market data of the last 30 days
    data = {crypto: fetch_market_data(crypto) for crypto in cryptos}
    # Combine data into a single DataFrame
    merged_data = pd.concat([df['price'].rename(crypto) for crypto, df in data.items()], axis=1)

    merged_data.ffill(inplace=True)  # Forward fill to handle leading NaNs
    merged_data.bfill(inplace=True)  # Backward fill to handle trailing NaNs

    # calculate the log returns
    returns = np.log(merged_data / merged_data.shift(1)).dropna()

    # Calculate the mean returns
    mean_returns = returns.mean()

    # Calculate the covariance matrix
    cov_matrix = returns.cov()

    # sentiment analysis on the coin tweets
    # example tweets to demonstrate the sentiment analysis
    tweets = {
            'bitcoin': ["Lately, Bitcoin has been outperforming expectations. Positive outlook ahead. #BTC #investing",
                        "BTC is on the rise again! Love seeing this kind of upward momentum. #Bitcoin #crypto",
                        "Bitcoin has been doing incredibly well this month. Definitely seeing some promising gains. #BTC #cryptogains"],
            'ethereum': ["Ethereum’s DeFi ecosystem is thriving! $ETH to $5k might happen sooner than we think. #Ethereum #ETH #DeFi",
                        "Ethereum’s smart contracts are transforming industries. $ETH is a must-have in any portfolio! #Ethereum #ETH #blockchain"],
            'binancecoin': ["Binance Coin is struggling big time... Regulatory concerns are dragging it down. #BNB #crypto", 
                            "Major FUD around Binance Coin lately. This dip looks like it might be the start of something worse. 😟 #BNB #cryptomarket",
                            "Lately, BNB has been a disappointment. Negative trends are worrying. #BinanceCoin #crypto"],
            'cardano': ["Cardano’s hype is fading fast. Delays and broken promises are killing confidence. #Cardano #ADA #crypto",
                        "Cardano is stalling. The lack of progress is getting frustrating. 😕 #ADA #cryptomarket"],
            'ripple': ["Ripple's situation is neither positive nor negative, just holding steady for now. #XRP #crypto",
                            "Ripple is just there, not much change. No major positive or negative trends. #XRP #cryptomarket"]
            }

    scores = {}
    for asset in cryptos:
            scores[asset] = get_sentiment(tweets[asset])

    # investor views are calculated using sentiment analysis
    Q = np.zeros((math.comb(len(cryptos),2),))
    P = np.zeros((math.comb(len(cryptos),2), len(cryptos)))
    omega = np.diag([0.0001]*Q.shape[0])
    view = 0
    for i in range(len(cryptos)):
            for j in range(i+1,len(cryptos)):
                    P[view,i] = int(np.sign(scores[cryptos[i]] - scores[cryptos[j]]))
                    P[view,j] = int(np.sign(scores[cryptos[j]] - scores[cryptos[i]]))
                    Q[view] = abs(scores[cryptos[i]] - scores[cryptos[j]])/10
                    view = view + 1
                    assert np.all(np.sum(P, 1) == 0) 

    # Market weights and equilibrium returns
    market_weights = np.array([0.6, 0.3, 0.1, 0.2, 0.1])  # Example weights - In real scenario they will be calculated based on market cap of each coin
    tau = 0.025
    market_equilibrium_returns = np.dot(cov_matrix, market_weights) / tau

    # Black-Litterman Expected Returns
    M_inverse = np.linalg.inv(tau * cov_matrix)
    BL_returns = np.linalg.inv(M_inverse + np.dot(np.dot(P.T, np.linalg.inv(omega)), P)).dot(
        np.dot(M_inverse, market_equilibrium_returns) + np.dot(np.dot(P.T, np.linalg.inv(omega)), Q))
    
    optimal_weights = mvo_optimizer(BL_returns, cov_matrix)
    # assert sum(optimal_wSeights) == 1.0
    print("Optimal Weights are: "+str(optimal_weights))

    return optimal_weights
