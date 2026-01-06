// import { NextRequest, NextResponse } from 'next/server';
// import { supabase } from '@/utils/supabase/server';

// export async function GET(request: NextRequest) {
//   const uid = request.nextUrl.searchParams.get('uid');
//   const discord_id = request.nextUrl.searchParams.get('discord_id');
  
//   if (!uid && !discord_id) {
//     return NextResponse.json({ error: 'Either uid or discord_id parameter is required' }, { status: 400 });
//   }

//   try {
//     // First check if the user exists in the database
//     const { data: userData, error: userError } = await supabase
//       .from('userData')
//       .select('*')
//       .or(`userID.eq.${uid},discordID.eq.${discord_id}`)
//       .single();

//     if (userError) {
//       // console.log(uid);
//       console.log('User not found, creating new user');
      
//       try {
//         // If user doesn't exist, create a new user record with default values
//         const { data: newUser, error: createError } = await supabase
//           .from('userData')
//           .insert([
//             { 
//               userID: uid, 
//               totalRecordings: 0, 
//               monthlySeconds: 0,
//               discordID: discord_id,
//               plan: 'Free' 
//             }
//           ]);
        
//         if (createError) {
//           console.error('Error creating user:', createError);
//           // Instead of failing, return default values
//           return NextResponse.json({ 
//             userID: uid, 
//             totalRecordings: 0, 
//             monthlySeconds: 0, 
//             plan: 'Free',
//             discordID: discord_id,
//             isDefaultData: true
//           });
//         }
        
//         // Return the newly created user or default values
//         return NextResponse.json(newUser?.[0] || { 
//           userID: uid, 
//           totalRecordings: 0, 
//           monthlySeconds: 0, 
//           plan: 'Free',
//           discordID: discord_id,
//           isDefaultData: true
//         });
//       } catch (insertError) {
//         console.error('Error in insert operation:', insertError);
//         // Return default values if insert fails
//         return NextResponse.json({ 
//           userID: uid, 
//           totalRecordings: 0, 
//           monthlySeconds: 0, 
//           plan: 'Free',
//           discordID: discord_id,
//           isDefaultData: true
//         });
//       }
//     }

//     // Update user data if missing fields
//     if (userData) {
//       const updates: any = {};
//       if (!userData.userID && uid) updates.userID = uid;
//       if (!userData.discordID && discord_id) updates.discordID = discord_id;
      
//       if (Object.keys(updates).length > 0) {
//         const { data: updatedUser, error: updateError } = await supabase
//           .from('userData')
//           .update(updates)
//           .or(`userID.eq.${uid},discordID.eq.${discord_id}`)
//           .single();
          
//         if (!updateError && updatedUser) {
//           return NextResponse.json(updatedUser);
//         }
//       }
//     }
//     return NextResponse.json(userData);

//   } catch (error) {
//     console.error('Error processing request:', error);
//     // Return default values instead of an error
//     return NextResponse.json({ 
//       userID: uid, 
//       totalRecordings: 0, 
//       monthlySeconds: 0, 
//       plan: 'Free',
//       discordID: discord_id,
//       isDefaultData: true
//     });
//   }
// } 