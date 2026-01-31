const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendAdminOrderNotification = async (order) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!adminEmail) {
            console.warn('ADMIN_EMAIL is not defined in .env');
            return;
        }

        const { data, error } = await resend.emails.send({
            from: 'SportsCart <onboarding@resend.dev>', // Use default Resend testing email or configured domain
            to: [adminEmail],
            subject: `New Order Received: ${order.orderNumber}`,
            html: `
                <h1>New Order Alert!</h1>
                <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                <p><strong>Customer:</strong> ${order.customer.name} (${order.customer.email})</p>
                <p><strong>Total Amount:</strong> $${order.total.toFixed(2)}</p>
                <h3>Items:</h3>
                <ul>
                    ${order.items.map(item => `
                        <li>${item.name} - Qty: ${item.quantity} - $${item.price}</li>
                    `).join('')}
                </ul>
                <p>Please check the admin dashboard for more details.</p>
            `,
        });

        if (error) {
            console.error('Error sending email:', error);
            return null;
        }

        console.log('Admin notification email sent:', data);
        return data;
    } catch (err) {
        console.error('Unexpected error sending email:', err);
        return null; // Don't break the order flow if email fails
    }
};

module.exports = {
    sendAdminOrderNotification
};
