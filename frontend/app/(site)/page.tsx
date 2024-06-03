import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import PageContent from './components/PageContent';
import getSongs from '@/actions/song/getSongs';

export const revalidate = 1;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden scrollbar-webkit overflow-y-auto">
      <Header
        style={{
          backgroundImage: `linear-gradient(to bottom, #10b981 var(--tw-gradient-from-position), rgb(16 185 129 / 0) var(--tw-gradient-from-position) )`,
        }}
      >
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            {/* TODO: add get fav song and play immediate */}
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
        <div className="break my-20"></div>
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
}
