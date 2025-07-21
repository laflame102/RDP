import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  href?: string;
}

export default function BackButton({ href }: BackButtonProps) {
  return (
    <Link href={href || "/recipes"} className="flex items-center gap-2 mb-2">
      <ArrowLeft className="w-5 h-5 " /> Back to Recipes
    </Link>
  );
}
