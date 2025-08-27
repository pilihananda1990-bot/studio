
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle>Help & Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Help and feedback form will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
