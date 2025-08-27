
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WalletPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Wallet details will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
