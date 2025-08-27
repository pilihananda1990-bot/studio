
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>App settings will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
