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
        <GenreList />
      </SearchBar>
      <Latest />
      <Populars />
      <TopRated />
    </div>
  );
}

export default Homepage;
