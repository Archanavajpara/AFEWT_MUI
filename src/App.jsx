// components => html tags eg. div, h1, p, span
// variants => different styles of the same component eg. h1, h2, h3 for Typography
// sx => custom styles eg. {color: 'red', marginTop: '20px'}
import { useState } from 'react'
import Demo from './Lab10/Demo'
import Typography  from './Lab10/Typography'
import Custom from './Lab10/Custom'
import Card from './Lab10/Card'
import Banner from './Lab10/Banner'
import TableB from './Lab11/TableB'
import StriptedT from './Lab11/StriptedT'
import Tooltip1 from './Lab11/Tooltip1'
import ToolTran from './Lab11/ToolTran'
import PageL from './Lab12/PageL'
import Column2 from './Lab12/Column2'
import Box4 from './Lab12/Box4'
import Appbar from './Lab13/Appbar'
import BasicBreadcrumb from './Lab13/BasicBreadcrumb'
import Dropbutton from './Lab13/Dropbutton'
import Tab3 from './Lab13/Tab3'
import BottomNav from './Lab13/BottomNav'
import BasicSnackbar from './Lab15/BasicSnakebar'
import SmoothType from './Lab20/SmoothType'
import TextUp from './Lab20/TextUp'
import TabSwitcher from './Lab20/TabSwitcher'
import PreventUI from './Lab20/PreventUI'

function App() {
  return (
    <>
      <div>
        {/* <Demo/>
        <Typography/>
        <Custom/>
        <Card/>
        <Banner/> */}
      </div>
      <div>
        {/* <TableB/> */}
        {/* <StriptedT/> */}
        {/* <Tooltip1/> */}
        {/* <ToolTran/> */}
      </div>
      <div>
        {/* <PageL/> */}
        {/* <Column2/> */}
        {/* <Box4/> */}
      </div>
      <div>
        {/* <Appbar/>
        <BasicBreadcrumb/>
        <Dropbutton/>
        <Tab3/>
        <BottomNav/> */}
      </div>
      <div>
        {/* <BasicSnackbar/> */}
      </div>
      <div>
          {/* <SmoothType/> */}
          {/* <TextUp/> */}
          {/* <TabSwitcher/> */}
          <PreventUI/>
      </div>
    </>
  )
}

export default App
