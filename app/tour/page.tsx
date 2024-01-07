import Tour2023 from '@/components/tour/tour';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Tour() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (session === null) {
    redirect('/login');
  }

  const { data: modelsData } = await supabase
    .from('models')
    .select('*')
    .eq('author_username', session.user?.user_metadata?.full_name);

  const { data: tokensData } = await supabase
    .from('tokens')
    .select('usage')
    .eq('user', session.user?.id);

  const numberOfModels = modelsData ? modelsData.length : 0;
  let totalLikes = 0;
  let kitsAiCount = 0;
  let rvcCount = 0;
  let totalEpochs = 0;
  let epochsCount = 0;
  let totalUsage = 0;
  let usageCount = 0;

  if (modelsData) {
    modelsData.forEach(model => {
      if (model.likes) {
        totalLikes += model.likes;
      }

      if (model.type === 'Kits.AI') {
        kitsAiCount += 1;
      } else if (model.type === 'RVC') {
        rvcCount += 1;
      }

      if (model.epochs && model.epochs !== 'N/A') {
        totalEpochs += parseInt(model.epochs, 10);
        epochsCount += 1;
      }
    });
  }

  if (tokensData) {
    tokensData.forEach(token => {
      if (token.usage && token.usage !== 'N/A') {
        totalUsage += parseInt(token.usage, 10);
        usageCount += 1;
      }
    });
  }

  const averageEpochs = epochsCount > 0 ? Math.floor(totalEpochs / epochsCount) : 0;
  const averageUsage = usageCount > 0 ? Math.floor(totalUsage / usageCount) : 0;

  return (
    <main className="absolute inset-0">
      <Tour2023
        numberOfModels={numberOfModels}
        modelLikes={totalLikes}
        kitsAiCount={kitsAiCount}
        rvcCount={rvcCount}
        epochsCount={averageEpochs}
        apiUsage={averageUsage}
        full_name={session.user.user_metadata.full_name}
      />
    </main>
  );
}