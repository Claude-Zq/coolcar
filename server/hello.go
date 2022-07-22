package main

import (
	trippb "coolcar/proto/gen/go" //引入包
	"encoding/json"
	"fmt"

	"google.golang.org/protobuf/proto"
)

func main() {
	trip := trippb.Trip{
		Start:       "abc",
		End:         "def",
		DurationSec: 0,
		FeeCent:     10000,
		StartPos: &trippb.Location{
			Latitude:  30,
			Longitude: 120,
		},
		EndPos: &trippb.Location{
			Latitude:  35,
			Longitude: 115,
		},
		PathLocations: []*trippb.Location{
			{
				Latitude:  31,
				Longitude: 119,
			},
			{
				Latitude:  32,
				Longitude: 119,
			},
		},
		Status: trippb.TripStatus_IN_PROGRESS,
	}
	fmt.Println(&trip) //锁的原因，只能使用地址

	b, err := proto.Marshal(&trip) //序列化
	if err != nil {
		panic(err)
	}
	fmt.Printf("%X\n", b) //输出序列化后的结果

	var trip2 trippb.Trip
	err = proto.Unmarshal(b, &trip2) //反序列化
	if err != nil {
		panic(err)
	}
	fmt.Println(&trip2) //输出反序列化后的值

	//由于在生成的文件中，也有json的tag,所以也可以转成json
	b, err = json.Marshal(&trip)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", b)

	var trip3 trippb.Trip
	err = json.Unmarshal(b, &trip3)
	if err != nil {
		panic(err)
	}
	fmt.Println(&trip3)

}
