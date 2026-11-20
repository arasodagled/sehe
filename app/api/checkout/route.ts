import {NextRequest,NextResponse} from 'next/server';
import Stripe from 'stripe';
import {products} from '../../products';
export const runtime='nodejs';
export async function POST(request:NextRequest){
 try{
  const key=process.env.STRIPE_SECRET_KEY;
  if(!key) return NextResponse.json({error:'Stripe is not configured yet.'},{status:503});
  const stripe=new Stripe(key);
  const body=await request.json();
  if(!Array.isArray(body.items)||body.items.length===0||body.items.length>20) return NextResponse.json({error:'Invalid basket.'},{status:400});
  const line_items:Stripe.Checkout.SessionCreateParams.LineItem[]=[];
  for(const item of body.items){
   const product=products.find(p=>p.id===item.id);
   if(!product||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>10) return NextResponse.json({error:'Invalid product or quantity.'},{status:400});
   line_items.push({price_data:{currency:'gbp',unit_amount:product.price,product_data:{name:product.name,description:`${product.scent.notes} · ${product.size}`}},quantity:item.quantity});
  }
  const origin=process.env.NEXT_PUBLIC_SITE_URL||request.nextUrl.origin;
  const session=await stripe.checkout.sessions.create({mode:'payment',line_items,success_url:`${origin}/success?session_id={CHECKOUT_SESSION_ID}`,cancel_url:`${origin}/cancel`,billing_address_collection:'required',shipping_address_collection:{allowed_countries:['GB']},phone_number_collection:{enabled:true},shipping_options:[{shipping_rate_data:{type:'fixed_amount',fixed_amount:{amount:450,currency:'gbp'},display_name:'UK standard delivery'}}],allow_promotion_codes:true});
  return NextResponse.json({url:session.url});
 }catch(error){console.error('Checkout error',error);return NextResponse.json({error:'Unable to start checkout.'},{status:500})}
}
