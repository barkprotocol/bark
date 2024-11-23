import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the BARK Protocol service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.</p>
          
          <h2>2. Use of Service</h2>
          <p>You agree to use the BARK Protocol service only for purposes that are legal, proper and in accordance with these terms and any applicable laws or regulations.</p>
          
          <h2>3. Account Registration</h2>
          <p>To access certain features of the service, you may be required to register for an account. You agree to provide accurate, current and complete information during the registration process and to update such information to keep it accurate, current and complete.</p>
          
          <h2>4. Intellectual Property</h2>
          <p>The service and its original content, features and functionality are and will remain the exclusive property of BARK Protocol and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
          
          <h2>5. User Contributions</h2>
          <p>Any content you contribute to the service may be visible to other users and can be used, copied, modified, or distributed by other users in accordance with your indicated preferences.</p>
          
          <h2>6. Termination</h2>
          <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
          
          <h2>7. Limitation of Liability</h2>
          <p>In no event shall BARK Protocol, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
          
          <h2>8. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of United States, without regard to its conflict of law provisions.</p>
          
          <h2>9. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
          
          <h2>10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>Email: legal@stormprotocol.com</p>
          <p>Address: 123 Solana Street, Storm City, CC 12345</p>
        </CardContent>
      </Card>
    </div>
  );
}