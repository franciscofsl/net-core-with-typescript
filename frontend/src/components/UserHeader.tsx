import React from 'react'
import {
  Button,
  Avatar,
  Text,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Divider,
  makeStyles,
  tokens
} from '@fluentui/react-components'
import {
  ChevronDownRegular,
  SignOutRegular
} from '@fluentui/react-icons'

const useStyles = makeStyles({
  header: {
    background: `linear-gradient(135deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackgroundHover} 100%)`,
    padding: '0 24px',
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: tokens.shadow8,
    position: 'relative',
    zIndex: '1000',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  appLogo: {
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: '1.6rem',
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: '0.5px',
    margin: '0',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  userButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: tokens.colorNeutralForegroundOnBrand,
    gap: '8px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  menuHeader: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  userName: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontSize: '14px',
  },
  userEmail: {
    color: tokens.colorNeutralForeground2,
    fontSize: '12px',
  },
})

const UserHeader: React.FC = () => {
  const styles = useStyles()

  const handleLogout = () => {
    console.log('Cerrando sesión...')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Text as="h1" className={styles.appLogo}>
          Mi Sistema
        </Text>
      </div>
      
      <div className={styles.headerRight}>
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            <Button 
              appearance="transparent" 
              className={styles.userButton}
              icon={<ChevronDownRegular />}
              iconPosition="after"
            >
              <Avatar
                color="brand"
                initials="JD"
                size={32}
              />
              <Text>Juan Díaz</Text>
            </Button>
          </MenuTrigger>
          
          <MenuPopover>
            <MenuList>
              <div className={styles.menuHeader}>
                <Avatar
                  color="brand"
                  initials="JD"
                  size={40}
                />
                <div className={styles.userInfo}>
                  <Text className={styles.userName}>Juan Díaz</Text>
                  <Text className={styles.userEmail}>juan.diaz@empresa.com</Text>
                </div>
              </div>
              <Divider />
              <MenuItem
                icon={<SignOutRegular />}
                onClick={handleLogout}
              >
                Cerrar sesión
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </header>
  )
}

export default UserHeader
