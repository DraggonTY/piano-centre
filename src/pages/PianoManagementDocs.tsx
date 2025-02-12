
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const PianoManagementDocs = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Piano Management Documentation</h1>
      
      <div className="space-y-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Piano Categories</CardTitle>
              <CardDescription>Understanding different piano types and categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">New Pianos</h3>
                  <p>Brand new instruments with full manufacturer warranty</p>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Latest models and features</li>
                    <li>Factory-fresh condition</li>
                    <li>Complete documentation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold">Used Pianos</h3>
                  <p>Pre-owned instruments in excellent condition</p>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Professionally inspected</li>
                    <li>Detailed history available</li>
                    <li>Competitive pricing</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold">Digital Pianos</h3>
                  <p>Modern electronic instruments</p>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Multiple sound options</li>
                    <li>Maintenance-free</li>
                    <li>Perfect for apartments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Browsing the Catalog</CardTitle>
              <CardDescription>How to find the perfect piano</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Search and Filter</h3>
                <ul className="list-disc ml-6">
                  <li>Use category filters to narrow your search</li>
                  <li>Filter by price range</li>
                  <li>Search by manufacturer or model</li>
                  <li>Sort by various criteria</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Piano Specifications</CardTitle>
              <CardDescription>Understanding piano details and measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Physical Specifications</h3>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Dimensions (width, height, depth)</li>
                    <li>Weight</li>
                    <li>Number of keys</li>
                    <li>Number of pedals</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold">Additional Features</h3>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Finish options</li>
                    <li>Sound characteristics</li>
                    <li>Special features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-between items-center">
          <Link to="/docs/admin" className="text-blue-600 hover:text-blue-800">
            Next: Admin Documentation →
          </Link>
          <Link to="/auth/documentation" className="text-blue-600 hover:text-blue-800">
            ← Back to Auth Documentation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PianoManagementDocs;
