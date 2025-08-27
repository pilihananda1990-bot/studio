
import { Separator } from '@/components/ui/separator';
import { PageHeader } from '@/components/app/page-header';

const termsContent = [
  {
    type: 'heading',
    level: 1,
    text: 'Terms & Conditions',
  },
  {
    type: 'paragraph',
    text: 'Last updated: ' + new Date().toLocaleDateString(),
  },
  {
    type: 'heading',
    level: 2,
    text: '1. Introduction',
  },
  {
    type: 'paragraph',
    text: 'Welcome to EcoCollect! These terms and conditions outline the rules and regulations for the use of our application. By accessing this app, we assume you accept these terms and conditions. Do not continue to use EcoCollect if you do not agree to all of the terms and conditions stated on this page.',
  },
  {
    type: 'heading',
    level: 2,
    text: '2. User Obligations',
  },
  {
    type: 'heading',
    level: 3,
    text: '2.1. Account Creation',
  },
  {
    type: 'paragraph',
    text: 'You must be at least 18 years of age to create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account or password.',
  },
  {
    type: 'heading',
    level: 3,
    text: '2.2. Prohibited Activities',
  },
  {
    type: 'paragraph',
    text: 'You are specifically restricted from all of the following: publishing any app material in any other media; selling, sublicensing and/or otherwise commercializing any app material; using this app in any way that is or may be damaging to this app; using this app in any way that impacts user access to this app.',
  },
  {
    type: 'heading',
    level: 2,
    text: '3. Limitation of Liability',
  },
  {
    type: 'paragraph',
    text: 'In no event shall EcoCollect, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this app whether such liability is under contract. EcoCollect, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this app.',
  },
   {
    type: 'heading',
    level: 2,
    text: '4. Governing Law & Jurisdiction',
  },
  {
    type: 'paragraph',
    text: 'These Terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in for the resolution of any disputes.',
  },
];

export default function TermsPage() {
  return (
    <div>
        <PageHeader title="Terms & Conditions" backHref="/profile" backText="Profile" />
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="prose max-w-none dark:prose-invert">
            {termsContent.slice(1).map((item, index) => {
                if (item.type === 'heading') {
                if (item.level === 2) {
                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-2">{item.text}</h2>;
                }
                if (item.level === 3) {
                    return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{item.text}</h3>;
                }
                }
                if (item.type === 'paragraph') {
                return <p key={index} className="text-base leading-relaxed text-muted-foreground">{item.text}</p>;
                }
                return null;
            })}
            </div>
        </div>
    </div>
  );
}
