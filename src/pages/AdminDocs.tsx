
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

const AdminDocs = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Admin Documentation</h1>
      
      <div className="space-y-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Managing piano listings in the marketplace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Adding New Pianos</h3>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>Navigate to the Admin Dashboard</li>
                  <li>Click "Add New Piano"</li>
                  <li>Fill in all required information</li>
                  <li>Upload high-quality images</li>
                  <li>Review and publish the listing</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Image Guidelines</CardTitle>
              <CardDescription>Requirements for piano images</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 space-y-2">
                <li>High resolution (minimum 1920x1080)</li>
                <li>Clear, well-lit photographs</li>
                <li>Multiple angles of the piano</li>
                <li>Close-ups of any special features or damage</li>
                <li>Maximum file size: 10MB per image</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Managing user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Admin Capabilities</h3>
                <ul className="list-disc ml-6">
                  <li>View all user accounts</li>
                  <li>Modify user permissions</li>
                  <li>Reset user passwords</li>
                  <li>Disable or enable accounts</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-between items-center">
          <Link to="/docs/user-guide" className="text-blue-600 hover:text-blue-800">
            Next: User Guide →
          </Link>
          <Link to="/docs/piano-management" className="text-blue-600 hover:text-blue-800">
            ← Back to Piano Management
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDocs;
