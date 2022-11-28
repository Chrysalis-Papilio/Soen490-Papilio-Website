import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row justify-end items-center gap-1'>
      <span className='hover:border-b-2 border-brand-orange cursor-pointer box-border'>Features</span>
      <span>Pricing</span>
      <span>Blog</span>
      <Button
        text='Login'
        onClick={() => {
          navigate('/login');
        }}
        variant='outline'
        margin='left'
      />
      <Button
        text='Getting start'
        onClick={() => { navigate('/admin'); }}
        margin='left'
      />
    </div>
  );
};

export default Header;
