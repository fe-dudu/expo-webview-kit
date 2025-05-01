import { cn } from '../utils/cn';
import { Card, CardContent } from './Card';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  logo: React.ReactNode;
  children: React.ReactNode;
}

export function LoginLayout({ logo, children, className, ...props }: Props) {
  return (
    <main className="flex items-center min-h-dvh flex-col">
      <section className="flex items-center justify-center flex-col w-full min-h-dvh max-w-sm gap-6">
        <div className="w-full flex justify-center">
          <div className="flex items-center justify-center rounded-md">{logo}</div>
        </div>
        <div className={cn('w-full px-2', className)} {...props}>
          <Card>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
