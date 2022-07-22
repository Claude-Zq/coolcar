package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	"fmt"
	"log"

	"google.golang.org/grpc"
)

func main() {

	//设置日志格式
	log.SetFlags(log.Lshortfile)

	conn, err := grpc.Dial("localhost:8081", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("cannot connnet server:%v", err)
	}
	tsClient := trippb.NewTripServiceClient(conn)
	r, err := tsClient.GetTrip(context.Background(), &trippb.GetTripRequest{Id: "trip120"})

	if err != nil {
		log.Fatalf("cannot call GetTrip: %v", err)
	}
	fmt.Println(r)
}
