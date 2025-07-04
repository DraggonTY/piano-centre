import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const from = (location.state as { from?: string })?.from || "/";

  const handleError = (error: any) => {
    let errorMessage = "An unexpected error occurred";

    // Parse the error message from the response body if available
    try {
      const errorBody = JSON.parse(error.body);
      if (errorBody.message === "Invalid login credentials") {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else {
        errorMessage = errorBody.message;
      }
    } catch {
      // If we can't parse the error body, use the main error message
      errorMessage = error.message;
    }
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: errorMessage
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      if (error) {
        handleError(error);
      } else {
        toast({
          title: "Success!",
          description: "Account created successfully. You can now sign in."
        });
        setIsSignUp(false);
      }
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        handleError(error);
      } else {
        navigate(from);
      }
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div>
            <CardTitle className="text-2xl">{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="auth-email">Email</Label>
              <Input 
                id="auth-email" 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-password">Password</Label>
              <Input 
                id="auth-password" 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                minLength={6} 
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (isSignUp ? "Creating account..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600">
          <div className="w-full">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal text-sm text-blue-600"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign in here
                </Button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal text-sm text-blue-600"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign up here
                </Button>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
