// import { NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabase';

// export async function GET(
//   req: Request,
//   context: { params: { id: string } }
// ) {
//   const { id } = await context.params;

//   console.log("📥 Fetching audit with ID:", id);

//   if (!id) {
//     return NextResponse.json(
//       { error: "Missing audit id" },
//       { status: 400 }
//     );
//   }

//   const { data, error } = await supabase
//     .from('audits')
//     .select('*')
//     .eq('id', id)
//     .single();

//   if (error) {
//     console.log("❌ Supabase fetch error:", error);

//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }

//   return NextResponse.json({ audit: data });
// }



// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabase";

// export async function GET(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;

//   console.log("📥 Fetching audit with ID:", id);

//   if (!id || id === "undefined") {
//     return NextResponse.json(
//       { error: "Missing audit id" },
//       { status: 400 }
//     );
//   }

//   const { data, error } = await supabase
//     .from("audits")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.log("❌ Supabase fetch error:", error);

//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }

//   return NextResponse.json({ audit: data });
// }





import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("📥 Fetching audit with ID:", id);

  if (!id || id === "undefined") {
    return NextResponse.json(
      { error: "Missing audit id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("❌ Supabase error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ audit: data });
}