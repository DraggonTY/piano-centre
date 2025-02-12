
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const AuthDocumentation = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Authentication Documentation</h1>
      
      <div className="space-y-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Understanding the authentication system in Piano Marketplace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Piano Marketplace uses a secure authentication system powered by Supabase.
                This system manages user access and administrative privileges throughout the application.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>User Authentication</CardTitle>
              <CardDescription>
                How to sign up and sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Sign Up</h3>
                <p>To create a new account:</p>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>Navigate to the Authentication page</li>
                  <li>Click on the "Sign Up" tab</li>
                  <li>Enter your email address</li>
                  <li>Choose a secure password</li>
                  <li>Click "Sign Up"</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Sign In</h3>
                <p>To sign in to your existing account:</p>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>Navigate to the Authentication page</li>
                  <li>Click on the "Sign In" tab</li>
                  <li>Enter your email address</li>
                  <li>Enter your password</li>
                  <li>Click "Sign In"</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Administrative Access</CardTitle>
              <CardDescription>
                Understanding administrator privileges and capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Administrator accounts have additional privileges in the Piano Marketplace:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Add new pianos to the inventory</li>
                <li>Edit existing piano listings</li>
                <li>Access to inventory management tools</li>
                <li>View and manage user accounts</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              If you're experiencing issues with authentication or need to reset your password,
              please contact our support team or use the password reset option on the login page.
            </AlertDescription>
          </Alert>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Security Best Practices</CardTitle>
              <CardDescription>
                Keeping your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc ml-6 space-y-2">
                <li>Use a strong, unique password</li>
                <li>Never share your login credentials</li>
                <li>Sign out when using shared devices</li>
                <li>Keep your email address up to date</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <div className="text-center mt-8">
          <Link 
            to="/auth" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Return to Authentication Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthDocumentation;
