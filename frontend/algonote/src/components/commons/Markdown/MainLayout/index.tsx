import React, { ReactNode } from 'react'
import s from './MainLayout.module.scss'

// MainLayout 컴포넌트의 Props 타입 정의
interface MainLayoutProps {
  children: ReactNode
}

// MainLayout 컴포넌트 정의
const MainLayout: React.FC<MainLayoutProps> & {
  Column: React.FC<MainLayoutProps>
} = ({ children }) => <main className={s.mainLayout}>{children}</main>

// MainLayout.Column 컴포넌트 정의
const Column: React.FC<MainLayoutProps> = ({ children }) => (
  <div className={s.mainLayoutCol}>{children}</div>
)

// displayName 설정
Column.displayName = 'MainLayoutColumn'

// MainLayout 객체에 Column 컴포넌트 할당
MainLayout.Column = Column
export default MainLayout
