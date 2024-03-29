import '../Ad/index.css';
import CheckMark from '../../components/CheckMark';
import { Link, useParams } from 'react-router-dom';

const Ad = (): JSX.Element => {
  const { businessId } = useParams();

  return (
    <div className="createGrid flex flex-col">
      <div className="basic">
        <div className="text-xl xl:text-4xl font-bold pb-4 xl:pb-12 text-center">
          BASIC
        </div>
        <div>
          <CheckMark /> Post{' '}
          <b className="font-extrabold text-lg xl:text-2xl">1</b> new activity
          per month
        </div>
        <div>
          <CheckMark /> Activity validity limit is{' '}
          <b className="font-extrabold text-lg xl:text-2xl">1</b> month
        </div>
        <div>
          <CheckMark /> Access to the Activity Manager to easily see a list of
          all of our posted activities
        </div>
        <div>
          <CheckMark /> Access to Activity Creation Center
        </div>
        <div>
          <CheckMark /> Access to Employee Manager to easily access data about
          your team
        </div>
        <div>
          <CheckMark /> Give access to{' '}
          <b className="font-extrabold text-lg xl:text-2xl">1</b> employee
          (admin)
        </div>
        <div className="text-lg xl:text-3xl font-bold pt-4 xl:pt-16 text-center">
          $9.99/month
        </div>
        <div className="text-center">
          <Link
            className="select-button basic-button"
            to={{
              pathname: '/payment',
              search: `?package=BASIC&id=${businessId ?? ''}`,
            }}
          >
            Select
          </Link>
        </div>
      </div>
      <div className="pro">
        <div className="text-xl xl:text-4xl font-bold pb-4 xl:pb-12 text-center">
          PRO
        </div>
        <div>
          <CheckMark /> Post{' '}
          <b className="font-extrabold text-lg xl:text-2xl">3</b> new activities
          per month
        </div>
        <div>
          <CheckMark /> Activity validity limit is{' '}
          <b className="font-extrabold text-lg xl:text-2xl">3</b> months
        </div>
        <div>
          <CheckMark /> Access to the Activity Manager to easily see a list of
          all of our posted activities
        </div>
        <div>
          <CheckMark /> Access to Activity Creation Center
        </div>
        <div>
          <CheckMark /> Access to Employee Manager to easily access data about
          your team
        </div>
        <div>
          <CheckMark /> Give access to{' '}
          <b className="font-extrabold text-lg xl:text-2xl">3</b> employees
          (including admin)
        </div>
        <div className="text-lg xl:text-3xl font-bold pt-4 xl:pt-16 text-center">
          $14.99/month
        </div>
        <div className="text-center">
          <Link
            className="select-button basic-button"
            to={{
              pathname: '/payment',
              search: `?package=PRO&id=${businessId ?? ''}`,
            }}
          >
            Select
          </Link>
        </div>
      </div>
      <div className="ultimate">
        <div className="text-xl xl:text-4xl font-bold pb-4 xl:pb-12 text-center">
          ULTIMATE
        </div>
        <div>
          <CheckMark /> Post{' '}
          <b className="font-extrabold text-md xl:text-xl">unlimited</b> new
          activities per month
        </div>
        <div>
          <CheckMark /> Activity validity limit is{' '}
          <b className="font-extrabold text-md xl:text-xl">unlimited</b>
        </div>
        <div>
          <CheckMark /> Access to the Activity Manager to easily see a list of
          all of our posted activities
        </div>
        <div>
          <CheckMark /> Access to Activity Creation Center
        </div>
        <div>
          <CheckMark /> Access to Employee Manager to easily access data about
          your team
        </div>
        <div>
          <CheckMark /> Give access to{' '}
          <b className="font-extrabold text-lg xl:text-2xl">10</b> employees
          (including admin)
        </div>
        <div className="text-lg xl:text-3xl font-bold pt-4 xl:pt-16 text-center">
          $19.99/month
        </div>
        <div className="text-center">
          <Link
            className="select-button basic-button"
            to={{
              pathname: '/payment',
              search: `?package=ULTIMATE&id=${businessId ?? ''}`,
            }}
          >
            Select
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ad;
