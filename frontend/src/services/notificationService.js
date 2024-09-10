// src/services/notificationService.js
import { subscribe_to_notifications } from '@coinweb/wallet-lib';

let subscription;

/**
 * Subscribes to transaction notifications for a given wallet.
 * @param {Object} wallet - The wallet to subscribe to notifications for.
 * @param {Function} handleNotification - The callback function to handle notifications.
 */
export const subscribeToNotifications = (wallet, handleNotification) => {
    if (subscription) {
        console.warn('Already subscribed to notifications');
        return;
    }

    try {
        // Subscribe to the notifications and handle them with the provided callback
        subscription = subscribe_to_notifications(wallet);
        subscription.subscribe(handleNotification);

        console.log('Subscribed to notifications');
    } catch (error) {
        console.error('Subscription Error:', error);
        throw error;
    }
};

/**
 * Unsubscribes from transaction notifications.
 */
export const unsubscribeFromNotifications = () => {
    if (subscription) {
        subscription.unsubscribe();
        subscription = null;
        console.log('Unsubscribed from notifications');
    } else {
        console.warn('No active subscription to unsubscribe from');
    }
};

module.exports = {unsubscribeFromNotifications, subscribeToNotifications};
