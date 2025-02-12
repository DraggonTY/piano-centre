
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const FAQDocs = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>General Questions</CardTitle>
              <CardDescription>Common inquiries about our platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">How do I create an account?</h3>
                <p className="mt-2">
                  Visit our authentication page and click on "Sign Up". Fill in your email
                  and password, then follow the verification instructions sent to your email.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">How can I list a piano for sale?</h3>
                <p className="mt-2">
                  You need an admin account to list pianos. Contact our support team
                  to request seller privileges for your account.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">What payment methods are accepted?</h3>
                <p className="mt-2">
                  Payment methods vary by seller. Contact the seller directly to
                  discuss payment options for specific pianos.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Technical Support</CardTitle>
              <CardDescription>Help with technical issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">I can't log in to my account</h3>
                <p className="mt-2">
                  Try resetting your password using the "Forgot Password" link. If issues persist,
                  contact our support team.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Images won't upload</h3>
                <p className="mt-2">
                  Ensure your images meet our size and format requirements. Try reducing
                  the file size if needed.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Need additional help? Contact our support team:</p>
                <ul className="list-disc ml-6">
                  <li>Email: support@pianomarketplace.com</li>
                  <li>Phone: (555) 123-4567</li>
                  <li>Hours: Monday-Friday, 9am-5pm EST</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-between items-center">
          <Link to="/auth/documentation" className="text-blue-600 hover:text-blue-800">
            ← Back to Documentation Home
          </Link>
          <Link to="/docs/technical" className="text-blue-600 hover:text-blue-800">
            ← Back to Technical Documentation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQDocs;
