// Include Post component
import BackToTop from './BackToTop';
import Categories from './Categories';
import Posts from './Posts';
import Wrapper from './Wrapper';

export default function App() {
  return <Content />;
}

const Content = () => {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-8 pt-8">
          <Categories />
          <Posts />
        </div>
      </Wrapper>
      <BackToTop />
    </>
  );
};
