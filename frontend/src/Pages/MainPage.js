import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { categoryDataState, isSidebarOpenState, postDataState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import MainFrame from '../Components/MainFrame';
import { getCategoryAndPostData, logoutUser } from './Async';

export const MainPage = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useRecoilState(categoryDataState);
  const [postData, setPostData] = useRecoilState(postDataState);

  const handleLogout = async () => {
    const msg = await logoutUser(localStorage.getItem('accessToken'));
    if (msg === '잘못된 요청입니다.') {
      alert(msg);
      return;
    }
    if (msg === '로그아웃 되었습니다') {
      alert(msg);
      localStorage.removeItem('accessToken');
      navigate('/login', { replace: true });
      window.location.reload();
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState); // 사이드바 관리 State

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log(1);
    const fetchData = async () => {
      const { message, categoryData, postData } =
        await getCategoryAndPostData();
      if (message === '찜목록 or 전체페이지 조회 완료') {
        console.log(message);
        setCategoryData((prevCategoryData) => {
          const filteredCategories = prevCategoryData.filter(
            (category) => category.name !== '페이지 목록'
          );

          return [
            ...filteredCategories,
            {
              id: '0', // Assign a unique key such as '0'
              name: '페이지 목록',
              categories: categoryData,
            },
          ];
        });
        setPostData(postData);
      } else {
        console.error('Failed to fetch post data');
      }
    };
    if (localStorage.getItem('accessToken') === null) {
      navigate('/login', { replace: true });
      window.location.reload();
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log(categoryData);
    console.log(postData);
  }, [categoryData, postData]);

  return (
    <div
      style={{
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Header handleLogout={handleLogout} handleMenuClick={handleMenuClick} />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* <Category isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}
        <MainFrame />
      </div>
    </div>
  );
};

export default MainPage;
