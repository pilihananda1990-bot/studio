
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Terms and conditions will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
