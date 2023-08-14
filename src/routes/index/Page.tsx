// Include Post component
import BackToTop from 'src/atoms/BackToTop';
import Categories from 'src/components/Categories';
import Posts from './Posts';
import Wrapper from 'src/components/IndexWrapper';

export default function PageIndex() {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-8 pt-8 pb-20">
          <Categories />
          <Posts />
        </div>
      </Wrapper>
      <BackToTop />
    </>
  );
}
