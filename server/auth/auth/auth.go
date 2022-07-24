package auth

// // AuthServiceServer is the server API for AuthService service.
// type AuthServiceServer interface {
// 	Login(context.Context, *LoginRequest) (*LoginResponse, error)
// }

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"

	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

//Service implements auth service.
type Service struct {
	OpenIDResolver OpenIDResolver
	Logger         *zap.Logger
}

// OpenIDResolver resolves an authorization code to an open id
type OpenIDResolver interface {
	Resolve(code string) (string, error)
}

//Login logs a user in.
func (s *Service) Login(c context.Context, req *authpb.LoginRequest) (*authpb.LoginResponse, error) {
	openID, err := s.OpenIDResolver.Resolve(req.Code)
	if err != nil {
		return nil, status.Errorf(codes.Unavailable, "cannot resolve openid: %v", err)
	}

	return &authpb.LoginResponse{
		AccessToken: "token for openId: " + openID,
		ExpiresIn:   7200,
	}, nil
}