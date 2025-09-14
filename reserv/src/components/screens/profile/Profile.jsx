import Layout from '../../layout/Layout'
import { useProfile } from './useProfile'
import styles from './Profile.module.scss'
import stylesLayout from '../../layout/Layout.module.scss'
import cn from 'clsx'
import Header from '../../layout/header/Header'
import Loader from '../../ui/Loader'
import Statistics from './statistics/Statistics'


const Profile = () => {
	const {data, isLoading} = useProfile()
	return (
	<>
	<div
	className={cn(stylesLayout.wrapper, stylesLayout.otherPage)}
	style={{ backgroundImage: `url('/images/profile-bg.jpg`, height: 356}}>
		<Header />

     <div className={styles.center}>
		{isLoading ? (<Loader />) : (
		<>
		<img src='/images/header/user.svg' alt='Profile' height='56'
		draggable={false} />
		<h1 className={stylesLayout.heading}>
			{data?.email}</h1> 
		</>
		)}
	 </div>

	 <Statistics />
	</div>
	<div className='wrapper-inner-page' style={{ paddingLeft: 0, paddingRight: 0}}>
	 <div className={styles.before_after}>
	  <div>
		<div className={styles.heading}>Before</div>
		<img src='/images/before.jpg' alt='' draggable={false} style={{ borderRadius: 14}}/>
	  </div>
	  <div>
		<div className={styles.heading}>After</div>
		<img src='/images/after.jpg' alt='' draggable={false} style={{ borderRadius: 14}}/>
	  </div>
	 </div>
	</div>
	</>
	)
}

export default Profile

