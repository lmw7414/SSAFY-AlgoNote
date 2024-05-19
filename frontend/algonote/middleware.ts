import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 이 함수는 내부에서 'await'를 사용하는 경우 'async'로 표시될 수 있음.
export const middleware = (request: NextRequest) => {
  if (!request.cookies.get('access_token')) {
    console.log('미들웨어')
    return NextResponse.redirect(new URL('/landing', request.url))
  }
  return undefined
}

// 미들웨어를 호출할 라우트 - 아래 Matching Paths 참조
export const config = {
  matcher: ['/mynote', '/solvedproblems', '/writenote', '/note', '/search'],
}
