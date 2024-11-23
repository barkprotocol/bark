'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, Bell, Send } from 'lucide-react'; 
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description: "You've been successfully subscribed to our newsletter. Check your inbox for a welcome email.",
        });
        setEmail('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <section className="py-16" id="newsletter">
      <div className="container mx-auto px-6 sm:px-8 lg:px-8">
        <Card className="w-full bg-white dark:bg-gray-950 shadow-lg rounded-md">
          <CardHeader className="flex flex-col items-center">
            <Bell className="w-10 h-10 text-brown-[#D0BFB4] mb-4" />
            <CardTitle className="text-4xl font-bold text-center text-gray-900 dark:text-white">
              Stay in the Loop
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Get the latest updates on BARK Protocol, exclusive insights, and community news delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="relative w-full sm:w-64">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-[#D0BFB4] w-4 h-4" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full shadow-md rounded-md"
                  aria-label="Email address"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full sm:w-auto px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-md flex items-center justify-center"
                disabled={isLoading || !validateEmail(email)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-brown-[#D0BFB4]" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 text-brown-[#D0BFB4]" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
              By subscribing, you agree to our <a href="/privacy-policy" className="underline hover:text-brown-[#D0BFB4] transition-colors duration-200">Privacy Policy</a> and <a href="/terms-of-service" className="underline hover:text-brown-[#D0BFB4] transition-colors duration-200">Terms of Service</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}