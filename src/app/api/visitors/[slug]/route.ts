import { Conversation } from "@/src/services/conversation";
import { Visitor } from "@/src/services/visitor";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
  ) {
    const slug = params.slug

    const visitor = new Visitor(slug);
  
    const visitorData = await visitor.getVisitor();

    return new Response(JSON.stringify(visitorData[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  const paramsBody = await request.json();

  const visitor = new Visitor(slug);

  const visitorData = await visitor.updateVisitor(paramsBody);

  return new Response(JSON.stringify(visitorData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}