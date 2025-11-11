import { Article, FaqItem  } from "@/components/blog_components/blog-card";


export const categories = [
  { name: "Cancellation and Refund", slug: "cancellation-and-refund" },
  { name: "Change Flight", slug: "change-flight" },
  { name: "Compensation", slug: "compensation" },
  { name: "Seat Upgrade", slug: "seat-upgrade" },
  { name: "Voucher", slug: "voucher" },
  { name: "Lost and Found", slug: "lost-and-found" },
  { name: "Check In", slug: "check-in" },
  { name: "Airport", slug: "airport" },
];

export const allBlogs: Article[] = [
  {
    id: "1",
    slug: "what-to-do-at-airport-layover",
    category: "Airport",
    categorySlug: "airport",
    title: "10 Things to Do During a Long Airport Layover",
    description: "Don't just sit and wait. Make the most of your time at the airport with these tips.",
    imageUrl: "/images/blog/airport-layover.jpg", // Make sure this image exists in your public folder
    authorName: "Alex Johnson",
    publishDate: "10 Oct 2025",
    // --- NEW FIELDS ---
    content: `
      <p>A long layover can either be a tedious wait or an unexpected mini-adventure, depending on how you approach it. Instead of dreading those extra hours at the airport, embrace the opportunity to explore, relax, or even get productive.</p>
      
      <h3>1. Explore the Airport's Amenities</h3>
      <p>Modern airports are often like small cities, offering a surprising range of facilities. Look for:</p>
      <ul>
        <li><strong>Lounges:</strong> Many airports have pay-per-use lounges or allow access with certain credit cards, offering comfortable seating, food, and showers.</li>
        <li><strong>Art Installations:</strong> Major hubs often feature impressive art. Take a self-guided tour!</li>
        <li><strong>Gardens or Outdoor Areas:</strong> Some airports have hidden gems like indoor gardens or even rooftop decks.</li>
        <li><strong>Shopping:</strong> Browse duty-free or specialty shops.</li>
      </ul>

      <h3>2. Catch Up on Work or Entertainment</h3>
      <p>Use the free Wi-Fi (if available) or mobile data to:</p>
      <ul>
        <li>Respond to emails or finish up tasks.</li>
        <li>Download movies, shows, or podcasts to watch offline.</li>
        <li>Read a book or listen to an audiobook.</li>
      </ul>

      <h3>3. Indulge in a Meal or Drink</h3>
      <p>Forget the sad plane food. Treat yourself to a proper sit-down meal or a relaxing drink at an airport bar. Many airports now boast excellent culinary options.</p>

      <h3>4. Exercise or Meditate</h3>
      <p>Combat travel fatigue with a light workout or some stretching. Some airports even have gyms or yoga rooms. Alternatively, find a quiet corner for meditation.</p>

      <h3>5. Go Sightseeing (if time allows)</h3>
      <p>If you have a very long layover (6+ hours) and don't need a visa for your destination, consider a quick trip into the nearest city. Always factor in travel time to and from the airport, and security check-in times.</p>

      <h3>6. Recharge Your Devices (and yourself)</h3>
      <p>Find charging stations and give all your electronics a boost. While they're charging, take a power nap. Many airports have designated quiet zones or even nap pods.</p>

      <h3>7. Plan Your Next Steps</h3>
      <p>Use the downtime to finalize plans for your destination, research local attractions, or organize your itinerary.</p>

      <h3>8. Write Postcards or Journal</h3>
      <p>In this digital age, a handwritten postcard or a journal entry can be a unique way to pass the time and create a lasting memory of your trip.</p>

      <h3>9. People-Watch</h3>
      <p>Airports are fascinating places for people-watching. Observe the diverse array of travelers from around the world.</p>

      <h3>10. Connect with Fellow Travelers</h3>
      <p>Strike up a conversation with someone at a cafe or lounge. You might make a new friend or get some valuable travel tips.</p>

      <p>By being prepared and open to possibilities, your next airport layover can be a surprisingly enjoyable part of your journey.</p>
    `,
    metaTitle: "10 Things to Do During a Long Airport Layover | SkyFlyWithUs Blog",
    metaDescription: "Make the most of your airport layover with our top 10 tips. From exploring amenities to mini-adventures, turn your wait into an opportunity.",
    metaKeywords: "airport layover, long layover, airport activities, travel tips, airport guide",
    faqs: [ 
      { id: "faq1-1", title: "Can I leave the airport during a layover?", content: "Yes, you can, but make sure you have the required visa for the country and enough time to get back through security." },
      { id: "faq1-2", title: "Are airport lounges worth it?", content: "For long layovers, many travelers find them very worth it for the comfort, free food, and quiet." }
    ],
  },
  {
    id: "2",
    slug: "how-to-get-compensation-for-flight",
    category: "Compensation",
    categorySlug: "compensation",
    title: "Your Guide to Flight Delay Compensation",
    description: "Was your flight delayed or cancelled? You might be entitled to compensation. Here's how to check.",
    imageUrl: "/images/blog/flight-delay.jpg", // Make sure this image exists in your public folder
    authorName: "Maria Garcia",
    publishDate: "5 Oct 2025",
    // --- NEW FIELDS ---
    content: `
      <p>Experiencing a flight delay or cancellation can be incredibly frustrating. Beyond the inconvenience, you might also be entitled to financial compensation. Understanding your rights and the steps to claim can make a significant difference.</p>

      <h3>When Are You Eligible for Compensation?</h3>
      <p>Eligibility often depends on several factors:</p>
      <ul>
        <li><strong>Reason for Delay/Cancellation:</strong> Was it within the airline's control (e.g., mechanical issue, crew shortage) or outside their control (e.g., extreme weather, political unrest)? Airlines are typically liable for issues within their control.</li>
        <li><strong>Length of Delay:</strong> Compensation usually kicks in for delays of 3 hours or more upon arrival.</li>
        <li><strong>Departure/Arrival Region:</strong> Regulations like EU261 (for flights within/to/from the EU) are robust, but other regions have different rules.</li>
      </ul>

      <h3>Key Steps to Claim Compensation</h3>
      <ol>
        <li><strong>Gather Information:</strong>
          <ul>
            <li>Keep all travel documents (boarding pass, booking confirmation).</li>
            <li>Note the exact flight number and scheduled/actual departure/arrival times.</li>
            <li>Document the reason given by the airline for the disruption.</li>
            <li>Collect receipts for any expenses incurred due to the delay (food, accommodation).</li>
          </ul>
        </li>
        <li><strong>Know Your Rights:</strong> Research the passenger rights regulations applicable to your flight.</li>
        <li><strong>Contact the Airline:</strong> Submit a formal complaint or compensation claim directly through the airline's website or customer service.</li>
        <li><strong>Escalate if Necessary:</strong> If the airline denies your claim or doesn't respond, you can escalate to national enforcement bodies or use a flight compensation service.</li>
      </ol>

      <h3>What Can You Claim For?</h3>
      <ul>
        <li><strong>Cash Compensation:</strong> A fixed amount based on flight distance and delay length.</li>
        <li><strong>Reimbursement:</strong> For essential expenses like meals, refreshments, and accommodation during long delays.</li>
        <li><strong>Rerouting or Refund:</strong> In case of cancellations or very long delays, you have the right to an alternative flight or a full refund.</li>
      </ul>

      <p>Don't let airlines get away with not compensating you for their controllable delays. Be informed and persistent to claim what you're owed.</p>
    `,
    metaTitle: "Flight Delay Compensation Guide | SkyFlyWithUs Blog",
    metaDescription: "Learn your rights and how to claim compensation for flight delays or cancellations. Our comprehensive guide covers eligibility, steps, and what you can claim.",
    metaKeywords: "flight delay compensation, flight cancellation compensation, passenger rights, EU261, airline claims",
    faqs: []
  },
  {
    id: "3",
    slug: "what-to-do-lost-luggage",
    category: "Lost and Found",
    categorySlug: "lost-and-found",
    title: "Lost Your Luggage? Here's What to Do Next",
    description: "A step-by-step guide to tracking down your lost bags and filing a claim.",
    imageUrl: "/images/blog/lost-luggage.jpg",
    authorName: "David Kim",
    publishDate: "1 Oct 2025",
    // --- NEW FIELDS ---
    content: `
      <p>The sinking feeling when your luggage doesn't appear on the carousel is a traveler's nightmare. While frustrating, it's not the end of the world. Here's a clear guide on what to do if your bags go missing.</p>

      <h3>1. Don't Panic – Act Immediately</h3>
      <p>Stay calm and head directly to the airline's baggage service desk (or "Lost & Found") in the arrival hall. Do NOT leave the airport without filing a report.</p>

      <h3>2. File a Property Irregularity Report (PIR)</h3>
      <p>This is crucial. At the baggage desk, you'll need to:</p>
      <ul>
        <li>Provide your flight details and baggage tags.</li>
        <li>Describe your luggage in detail (color, size, brand, unique markings).</li>
        <li>Provide contact information and your local address/hotel.</li>
        <li>Get a copy of the PIR form, which includes a reference number (File Reference). This number is essential for tracking your bag online.</li>
      </ul>

      <h3>3. Understand Your Rights Regarding Immediate Needs</h3>
      <p>If your luggage is delayed and you're away from home, the airline may be liable for essential purchases like toiletries, underwear, or a change of clothes. Keep all receipts!</p>

      <h3>4. Track Your Luggage Online</h3>
      <p>Use the File Reference number from your PIR to track your bag on the airline's website or a global baggage tracing system like WorldTracer.</p>

      <h3>5. What if it's Lost Permanently?</h3>
      <p>If your bag isn't found within a certain period (usually 21 days), it's considered permanently lost. At this point, you'll need to file a formal compensation claim with the airline for the lost contents.</p>

      <h3>6. Check Your Travel Insurance</h3>
      <p>Your travel insurance policy might offer additional coverage for delayed or lost luggage, often more generous than what the airline provides. Review your policy and start a claim if applicable.</p>

      <p>While a lost bag is never ideal, following these steps will maximize your chances of recovery and ensure you're properly compensated.</p>
    `,
    metaTitle: "Lost Luggage? What To Do Next | SkyFlyWithUs Blog",
    metaDescription: "Lost your luggage? Follow our step-by-step guide on what to do immediately, how to track your bags, claim compensation, and utilize travel insurance.",
    metaKeywords: "lost luggage, baggage lost, airline baggage, lost and found, travel insurance, PIR form",
    faqs: []
  },
  {
    id: "4",
    slug: "how-to-use-flight-voucher",
    category: "Voucher",
    categorySlug: "voucher",
    title: "How to Use Your Flight Voucher Effectively",
    description: "Don't let that travel voucher expire! Learn the best ways to use it.",
    imageUrl: "/images/blog/flight-voucher.jpg",
    authorName: "Alex Johnson",
    publishDate: "28 Sept 2025",
    content: `
      <p>Flight vouchers can be a great perk, often issued for cancellations, voluntary downgrades, or as part of a loyalty program. However, they come with specific rules. Here’s how to make the most of yours.</p>

      <h3>1. Understand the Terms & Conditions</h3>
      <p>Before you even think about booking, read the fine print. Key things to look for:</p>
      <ul>
        <li><strong>Expiration Date:</strong> This is critical. Don't let your voucher become worthless.</li>
        <li><strong>Transferability:</strong> Can someone else use it, or is it strictly for you?</li>
        <li><strong>Eligible Routes/Airlines:</strong> Is it valid on all routes, or specific ones? Is it only for the issuing airline, or their partners too?</li>
        <li><strong>Booking Channels:</strong> Can you use it online, or must you call customer service?</li>
        <li><strong>Minimum Spend:</strong> Is there a minimum amount you need to spend for the voucher to be valid?</li>
        <li><strong>Combinability:</strong> Can it be combined with other vouchers or promotions?</li>
      </ul>

      <h3>2. Plan Your Trip Strategically</h3>
      <p>To get the best value, try to use your voucher for a flight that is:</p>
      <ul>
        <li><strong>Within the voucher's validity period:</strong> Book *and* fly before it expires.</li>
        <li><strong>A suitable route:</strong> If it's for a specific region, plan a trip there.</li>
        <li><strong>Not significantly more expensive:</strong> If the voucher covers only a portion, be prepared to pay the difference.</li>
      </ul>

      <h3>3. Be Aware of Residual Value</h3>
      <p>If your flight costs less than the voucher amount, check if the airline issues a new voucher for the remaining balance. Some do, some don't, or they might convert it to a different form of credit.</p>

      <h3>4. Don't Forget Taxes and Fees</h3>
      <p>Often, vouchers cover the base fare but not all taxes and fees. Be prepared for these additional charges.</p>

      <h3>5. Consider Future Flexibility</h3>
      <p>If your voucher is flexible, consider booking a flight with a good change policy in case your plans shift. However, be aware that changing a flight booked with a voucher can sometimes be complicated.</p>

      <p>Flight vouchers are a form of currency. Treat them as such, and a little planning will ensure you don't leave money on the table.</p>
    `,
    metaTitle: "How to Use Your Flight Voucher Effectively | SkyFlyWithUs Blog",
    metaDescription: "Unlock the full value of your flight voucher with our expert tips. Learn to understand terms, plan strategically, and avoid common pitfalls.",
    metaKeywords: "flight voucher, travel voucher, airline voucher, how to use voucher, travel credit",
    faqs: []
  },
  {
    id: "5",
    slug: "airport-security-tips",
    category: "Airport",
    categorySlug: "airport",
    title: "Breeze Through Security: Top 5 Airport Tips",
    description: "Our top tips for getting through airport security faster than ever.",
    imageUrl: "/images/airplane-front5.jpg",
    authorName: "Maria Garcia",
    publishDate: "25 Sept 2025",
    content: `
      <p>Airport security can be the most stressful part of travel. Long lines, confusing rules, and the pressure to move quickly can frazzle anyone. But with a few smart strategies, you can glide through security like a seasoned pro.</p>

      <h3>1. Pack Smart (and Light)</h3>
      <ul>
        <li><strong>Liquids:</strong> Adhere strictly to the 3-1-1 rule for carry-on liquids (3.4 ounces/100 milliliters per item, in a 1-quart-sized bag).</li>
        <li><strong>Electronics:</strong> Know which electronics (laptops, tablets) need to be removed from your bag. Keep them easily accessible.</li>
        <li><strong>Layering:</strong> Wear minimal jewelry and easy-to-remove shoes and outerwear to minimize items you have to take off.</li>
      </ul>

      <h3>2. Be Ready Before You Reach the Scanner</h3>
      <p>Don't wait until you're at the front of the line to start preparing. As you queue:</p>
      <ul>
        <li>Empty your pockets into your carry-on or a personal item.</li>
        <li>Take off your watch, belt, and any bulky jewelry.</li>
        <li>Have your boarding pass and ID ready.</li>
      </ul>

      <h3>3. Choose the Right Lane (if options exist)</h3>
      <p>If available, consider:</p>
      <ul>
        <li><strong>TSA PreCheck/Clear/Priority Lanes:</strong> If you're eligible, these are always faster.</li>
        <li><strong>Family/Special Assistance Lanes:</strong> If traveling with children or needing extra help, these can be more patient.</li>
        <li><strong>The "Right" Regular Lane:</strong> Sometimes, the lane with business travelers (who are often efficient) moves faster than one with many families or inexperienced travelers.</li>
      </ul>

      <h3>4. Use Multiple Bins Efficiently</h3>
      <p>Don't try to cram everything into one bin. Use several if needed:</p>
      <ul>
        <li>One for your laptop/electronics.</li>
        <li>One for your 3-1-1 liquids bag.</li>
        <li>One for your coat, shoes, and any other items you had to remove.</li>
        <li>Your carry-on can go through directly if it doesn't contain items that need separate screening.</li>
      </ul>

      <h3>5. Be Polite and Cooperative</h3>
      <p>Security agents are just doing their job. A smile, a "please," and a "thank you" can make the experience smoother for everyone, and quickly following instructions is key.</p>

      <p>A little preparation goes a long way. By following these tips, you'll reduce stress and get to your gate faster, ready to enjoy your journey.</p>
    `,
    metaTitle: "Top 5 Airport Security Tips for Faster Travel | SkyFlyWithUs Blog",
    metaDescription: "Breeze through airport security with our top 5 expert tips. Learn how to pack smart, prepare efficiently, and choose the right lane for a stress-free experience.",
    metaKeywords: "airport security, travel tips, airport tips, security checkpoint, TSA PreCheck, faster security",
    faqs: []
  },
  {
    id: "6",
    slug: "jetstar-vs-rex",
    category: "Airlines", // This category isn't in your list yet, update your category array if you want it clickable
    categorySlug: "airlines",
    title: "Jetstar vs Rex: Airline Comparison Guide",
    description: "Not sure whether to fly with Jetstar or Rex? Check out our handy guide.",
    imageUrl: "/images/blog/jetstar-rex.jpg",
    authorName: "Rachel Berry",
    publishDate: "4 Sept 2025",
    content: "<p>Detailed comparison content for Jetstar vs Rex...</p>",
    metaTitle: "Jetstar vs Rex Airline Comparison | SkyFlyWithUs Blog",
    metaDescription: "Compare Jetstar and Rex airlines with our detailed guide. Find out which airline suits your travel needs best.",
    metaKeywords: "Jetstar, Rex, airline comparison, domestic flights",
    faqs: []
  },
  {
    id: "7",
    slug: "emirates-vs-etihad",
    category: "Airlines",
    categorySlug: "airlines",
    title: "Emirates vs Etihad: Airline Comparison Guide",
    description: "Compare routes, cabin comfort, baggage rules, loyalty perks and more.",
    imageUrl: "/images/blog/emirates-etihad.jpg",
    authorName: "Millie Scott",
    publishDate: "1 Aug 2025",
    content: "<p>Detailed comparison content for Emirates vs Etihad...</p>",
    metaTitle: "Emirates vs Etihad Airline Comparison | SkyFlyWithUs Blog",
    metaDescription: "Deciding between Emirates and Etihad? Our comprehensive guide compares their services, routes, and more for your next international flight.",
    metaKeywords: "Emirates, Etihad, airline comparison, international flights",
    faqs: []
  },
  {
    id: "8",
    slug: "qatar-vs-emirates",
    category: "Airlines",
    categorySlug: "airlines",
    title: "Qatar Airways vs Emirates: Airline Comparison Guide",
    description: "Choosing between Qatar Airways and Emirates? We've laid it all out.",
    imageUrl: "/images/blog/qatar-emirates.jpg",
    authorName: "Kim Pearton",
    publishDate: "22 Jul 2025",
    content: "<p>Detailed comparison content for Qatar vs Emirates...</p>",
    metaTitle: "Qatar Airways vs Emirates Comparison | SkyFlyWithUs Blog",
    metaDescription: "An in-depth look at Qatar Airways vs Emirates to help you choose the best airline for your journey.",
    metaKeywords: "Qatar Airways, Emirates, airline comparison, luxury travel",
    faqs: []
  },
];