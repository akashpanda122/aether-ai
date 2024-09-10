// src/services/walletService.js
import {get_token_balance, create_wallet} from '@coinweb/cweb-wallet-library';

/**
 * Creates a new wallet using the provided configuration.
 * @param {Object} config - The configuration for the wallet.
 * @returns {Promise<Object>} - A promise that resolves to the created wallet.
 */

const createWallet = async (config) => {
    try {
        const wallet = await create_wallet(config);
        return wallet;
    } catch (error) {
        console.error('Create Wallet Error:', error);
        throw error;
    }
};

/**
 * Retrieves the balance of a given wallet address.
 * @param {string} address - The wallet address to get the balance for.
 * @returns {Promise<number>} - A promise that resolves to the balance of the wallet.
 */
const getWalletBalance = async (address) => {
    try {
        const balance = await get_token_balance(address);
        return balance;
    } catch (error) {
        console.error('Get Balance Error:', error);
        throw error;
    }
};

module.exports = {getWalletBalance, createWallet};