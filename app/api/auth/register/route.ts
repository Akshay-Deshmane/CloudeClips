import { connectTODatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST Request on the route => /api/auth/register
*/

export async function POST(request : NextRequest) {
    try {

       const { email, password } = await request.json();

       if(!email || !password) {
        return NextResponse.json(
            {error : "Email and Password are required to Login"},
            {status : 400}
        )
       }

       await connectTODatabase();

       const existingUser = await User.findOne({email});

       if(existingUser) {
        return NextResponse.json(
            {error : "User already registered in DB"},
            {status : 400}
        );
       }

       await User.create({
        email, 
        password
       });

       return NextResponse.json(
        {message : "User Registered Successfully"}, 
        {status : 201}
       );
    }
    catch(error) {
        
        console.log("Registeration Failed");
        
        return NextResponse.json(
            {error : "Failed to Registered the user"},
            {status : 400}
        )

    }
}

