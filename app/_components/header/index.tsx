import Button from '../Button'
import Link from 'next/link'

export default function Header() {
	return (
		<header>
			<div className='container'>
				<div className='flex h-[60px] items-center gap-cozy'>
					<span className='aspect-square h-full  bg-primary-625'></span>
					<div className='flex-col-start h-full flex-1 justify-center bg-white px-cozy shadow-15'>
						<div className='flex items-center justify-between'>
							<ul className='flex list-none text-body-sm text-primary-625'>
								<li>
									<Link
										href={'/'}
										className='px-cozy text-primary-625'
									>
										Plants
									</Link>
								</li>
								<li>
									<Link
										href={'/'}
										className='px-cozy text-primary-625'
									>
										Plants
									</Link>
								</li>
								<li>
									<Link
										href={'/'}
										className='px-cozy text-primary-625'
									>
										Plants
									</Link>
								</li>
							</ul>
							<ul className='flex list-none gap-cozy'>
								<li>
									<span className='border-[1px] border-gray-500 px-compact py-[4px]'>
										lmao
									</span>
								</li>
								<li>
									<span className='border-[1px] border-gray-500 px-compact py-[4px]'>
										lmao
									</span>
								</li>
								<li>
									<span className='border-[1px] border-gray-500 px-compact py-[4px]'>
										lmao
									</span>
								</li>
							</ul>
						</div>
					</div>
					<Button className='h-full px-cozy'>Login</Button>
				</div>
			</div>
		</header>
	)
}
