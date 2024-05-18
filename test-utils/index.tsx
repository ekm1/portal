import React, { ReactNode } from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RootState } from '@/lib/store'

import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'

const mockStore = configureMockStore([thunk as any])

function render(
  ui: React.ReactElement,
  {
    initialState,
    ...renderOptions
  }: { initialState?: RootState } & RenderOptions = {},
) {

  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={mockStore(initialState)}>{children}</Provider>
  }

  return [rtlRender(ui, { wrapper: Wrapper, ...renderOptions }), mockStore]
}

export * from '@testing-library/react'
export { render }
