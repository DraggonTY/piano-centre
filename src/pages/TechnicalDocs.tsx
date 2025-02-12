
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const TechnicalDocs = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Technical Documentation</h1>
      
      <div className="space-y-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Overview of available API endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Authentication Endpoints</h3>
                <ul className="list-disc ml-6">
                  <li>POST /auth/signup - Create new account</li>
                  <li>POST /auth/signin - Sign in to existing account</li>
                  <li>POST /auth/signout - Sign out current user</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Piano Management Endpoints</h3>
                <ul className="list-disc ml-6">
                  <li>GET /pianos - List all pianos</li>
                  <li>GET /pianos/:id - Get specific piano</li>
                  <li>POST /pianos - Create new piano listing</li>
                  <li>PUT /pianos/:id - Update piano listing</li>
                  <li>DELETE /pianos/:id - Remove piano listing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Database Schema</CardTitle>
              <CardDescription>Database structure and relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Tables</h3>
                  <ul className="list-disc ml-6 mt-2">
                    <li>users - User account information</li>
                    <li>profiles - Extended user profiles</li>
                    <li>pianos - Piano listing details</li>
                    <li>categories - Piano categories</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Storage System</CardTitle>
              <CardDescription>File storage and management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Image Storage</h3>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Powered by Supabase Storage</li>
                    <li>Automatic image optimization</li>
                    <li>Secure access control</li>
                    <li>CDN distribution</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-between items-center">
          <Link to="/docs/faq" className="text-blue-600 hover:text-blue-800">
            Next: FAQ →
          </Link>
          <Link to="/docs/user-guide" className="text-blue-600 hover:text-blue-800">
            ← Back to User Guide
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDocs;
