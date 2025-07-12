import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import {
  TabList,
  Tab,
  makeStyles,
  tokens
} from '@fluentui/react-components'
import type { SelectTabData, SelectTabEvent } from '@fluentui/react-components'
import {
  HomeRegular,
  WeatherSunnyRegular
} from '@fluentui/react-icons'

const useStyles = makeStyles({
  navigation: {
    background: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: '0',
    position: 'sticky',
    top: '60px',
    zIndex: '999',
  },
  navContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 24px',
  },
  tabList: {
    background: 'transparent',
  },
  tab: {
    '&[data-selected="true"]': {
      color: tokens.colorBrandForeground1,
      borderBottomColor: tokens.colorBrandBackground,
    },
  },
})

interface NavigationItem {
  path: string
  label: string
  icon: React.ReactElement
  value: string
}

const FluentNavigation: React.FC = () => {
  const styles = useStyles()
  const location = useLocation()
  const navigate = useNavigate()

  const navigationItems: NavigationItem[] = [
    {
      path: '/',
      label: 'Inicio',
      icon: <HomeRegular />,
      value: 'home'
    },
    {
      path: '/weather',
      label: 'Weather',
      icon: <WeatherSunnyRegular />,
      value: 'weather'
    }
  ]

  const getSelectedValue = () => {
    if (location.pathname === '/') return 'home'
    if (location.pathname.startsWith('/weather')) return 'weather'
    return 'home'
  }

  const handleTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    // Find the item by value
    const item = navigationItems.find(nav => nav.value === data.value)
    if (item) {
      // Navigate to the path using React Router
      navigate(item.path)
    }
  }

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <TabList
          className={styles.tabList}
          selectedValue={getSelectedValue()}
          onTabSelect={handleTabSelect}
          size="large"
        >
          {navigationItems.map((item) => (
            <Tab
              key={item.value}
              value={item.value}
              icon={item.icon}
              className={styles.tab}
            >
              {item.label}
            </Tab>
          ))}
        </TabList>
      </div>
    </nav>
  )
}

export default FluentNavigation
