
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const UserGuideDocs = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">User Guide</h1>
      
      <div className="space-y-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Navigate the Piano Marketplace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Navigation Guide</h3>
                <ul className="list-disc ml-6">
                  <li>Browse pianos by category</li>
                  <li>Use search and filters</li>
                  <li>View detailed piano information</li>
                  <li>Contact sellers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Search and Filters</CardTitle>
              <CardDescription>Find the perfect piano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Using Filters</h3>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Filter by price range</li>
                    <li>Filter by piano type</li>
                    <li>Filter by manufacturer</li>
                    <li>Sort results by various criteria</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Contacting Sellers</CardTitle>
              <CardDescription>How to inquire about pianos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Making Inquiries</h3>
                  <ol className="list-decimal ml-6 mt-2">
                    <li>View piano details</li>
                    <li>Click "Contact Seller"</li>
                    <li>Fill out the inquiry form</li>
                    <li>Wait for seller response</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-between items-center">
          <Link to="/docs/technical" className="text-blue-600 hover:text-blue-800">
            Next: Technical Documentation →
          </Link>
          <Link to="/docs/admin" className="text-blue-600 hover:text-blue-800">
            ← Back to Admin Documentation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserGuideDocs;
