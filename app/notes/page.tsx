  import { createClient } from '@/app/utils/supabase/server';

  export default async function Notes() {
    const supabase = await createClient();
    const { data: breeds } = await supabase.from("breeds").select();

    return <pre>{JSON.stringify(breeds, null, 2)}</pre>
  }