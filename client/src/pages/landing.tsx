import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function Landing() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">₿</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">₿</span>
          </div>
          <span className="text-4xl font-bold text-gray-900">BitFamily</span>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Bitcoin Wallet for Families
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Teach your children about Bitcoin while managing their allowance and savings. 
          Secure on-chain savings with parental controls and Lightning Network spending.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Family Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Manage multiple child accounts with customizable allowances and spending limits.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Zero-knowledge architecture. Your private keys never leave your control.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setLocation('/dashboard')}
            >
              Open Dashboard
            </Button>
          ) : (
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => window.location.href = '/api/login'}
            >
              Get Started
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setLocation('/demo')}
          >
            Try Demo
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setLocation('/how-it-works')}
          >
            How It Works
          </Button>
        </div>
      </div>
    </div>
  );
}
