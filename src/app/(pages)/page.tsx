// eslint-disable-next-line import/extensions
import GenreList from '../components/GenreList';
import Latest from '../components/Latests';
import Populars from '../components/Populars';
import SearchBar from '../components/SearchBar';
import TopRated from '../components/TopRated';

function Homepage() {
  return (
    <div className="flex flex-col gap-5">
      <SearchBar>
        {/* @ts-expect-error Server Component */}
        <GenreList />
      </SearchBar>
      {/* @ts-expect-error Server Component */}
      <Latest />
      {/* @ts-expect-error Server Component */}
      <Populars />
      {/* @ts-expect-error Server Component */}
      <TopRated />
    </div>
  );
}

export default Homepage;
