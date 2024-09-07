import { pricingCards } from '@/lib/constants'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import Link from 'next/link'
import Image from "next/image";
import { getAuthUserDetails } from '@/lib/queries'
import { redirect } from 'next/navigation'
import CarouselHome from "./carousel_image"
import HeroBgAnimationHome from './animations'
import { stripe } from '@/lib/stripe'
import PricingCard from '../(main)/agency/[agencyId]/billing/_components/pricing_card'
const Home = async ()=> {
  
  // const user = await getAuthUserDetails()
  // if(user) return redirect(`/agency`)
  const prices = await stripe.prices.list({
    product: process.env.NEXT_WEBMAKER_PRODUCT_ID,
    active: true,
  })
  return (
<>
<section className="h-full w-full md:pt-44 mt-[70px] relative flex items-center justify-center flex-col ">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"/>
  
        {/* <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[200px]">
            WEBMAKER
          </h1>
        </div> */}
        <div className="flex justify-center items-center mt-[-100px] relative md:mt-[-70px]">
          {/* <Image
            src={'/assets/preview.png'}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          /> */}
          <div className='absolute  top-0 right-0'><HeroBgAnimationHome/></div>
          <div className='absolute  top-0 right-0'><HeroBgAnimationHome/></div>
          <div className='absolute  top-0 right-0'><HeroBgAnimationHome/></div>
          <CarouselHome/>
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>


    </section>
       <section className="flex pb-10 relative justify-center items-center flex-col gap-4 md:mt-[460px]">
       <div className='absolute  top-0 right-0 bottom-0 overflow-hidden'><HeroBgAnimationHome/></div> 
       
       <h2 className="text-3xl lg:text-4xl text-center">Choose What Fits You Right</h2>
       <p className="text-muted-foreground text-center">
         Our straightforward pricing plans are tailored to meet your needs. If
         {" you're"} not <br />
         ready to commit you can get started for free.
       </p>
       <div className="flex  justify-center gap-4 flex-wrap mt-6">

       {
         prices.data.map(
           (card)=>{
             return <Card key = {card.nickname}   className={clsx('w-[300px] flex flex-col justify-between', {
               'border-2 border-primary': card.nickname === 'Unlimited Saas',
             })}
             >
              <CardHeader>
                  <CardTitle className={clsx('',{"text-muted-foreground":card.nickname !== 'Unlimited Saas' })}>
                      {card.nickname} 
                  
                  </CardTitle> 
                  <CardDescription>{pricingCards.find(c=>c.title === card.nickname)?.description}</CardDescription>
             
              
              </CardHeader>              
              <CardContent>
                  <span className='text-4xl font-bold'>{card.unit_amount && card.unit_amount/100}</span> 
                  <span className='text-muted-foreground'>/ {card.recurring?.interval}</span> 
              </CardContent>
              <CardFooter className='flex flex-col items-start gap-4'>
                   <div>
                       {
                          pricingCards.find(c=>c.title === card.nickname)?.features
                          .map(
                            (f)=>(
                              <div
                              key = {f}
                              className='flex gap-2 items-center'>
                              <Check className='text-muted-foreground'/>
                              <p>{f}</p>
                              </div>
                            )
                          )
                       }  
                   </div>
                   <Link href={`agency?plan=${card.id}`} className={clsx("w-full text-center bg-primary p-2 rounded-md relative z-[50]",{"!bg-muted-foreground":card.nickname !== "Unlimited Saas"})}>
                       Get Started
                   </Link>
              </CardFooter>
             </Card>
             
           }
         )
       }
            <Card className={clsx('w-[300px] flex flex-col justify-between')}>
            <CardHeader>
              <CardTitle
                className={clsx({
                  'text-muted-foreground': true,
                })}
              >
                {pricingCards[0].title}
              </CardTitle>
              <CardDescription>{pricingCards[0].description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">$0</span>
              <span>/ month</span>
            </CardContent>
            <CardFooter className="flex flex-col  items-start gap-4 ">
              <div>
                {pricingCards
                  .find((c) => c.title === 'Starter')
                  ?.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex gap-2"
                    >
                      <Check />
                      <p>{feature}</p>
                    </div>
                  ))}
              </div>
              <Link
                href="/agency"
                className={clsx(
                  'w-full cursor-pointer text-center bg-primary p-2 rounded-md',
                  {
                    '!bg-muted-foreground': true,
                  }
                )}
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>

       </div>

   </section>

   </>
  );
}
export default Home