import BuyingProcess from './BuyingProcess'
import CustomerReviews from './CustomerReviews'
import FeaturedProduct from './FeaturedProducts'
import Hero from './Hero'
import WhyChooseUs from './WhyChooseUs'

export default function CustomerHomePage() {
	return (
		<>
			<Hero />
			<BuyingProcess />
			<FeaturedProduct />
			<WhyChooseUs />
			<CustomerReviews />
		</>
	)
}
