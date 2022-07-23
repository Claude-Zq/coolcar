package auth

// // AuthServiceServer is the server API for AuthService service.
// type AuthServiceServer interface {
// 	Login(context.Context, *LoginRequest) (*LoginResponse, error)
// }

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"

	"go.uber.org/zap"
)

//Service implements auth service.
type Service struct {
	Logger *zap.Logger
}

//Login logs a user in.
func (s *Service) Login(c context.Context, req *authpb.LoginRequest) (*authpb.LoginResponse, error) {
	s.Logger.Info("received code",
		zap.String("code", req.Code))

	return &authpb.LoginResponse{
		AccessToken: "token for " + req.Code,
		ExpiresIn:   7200,
	}, nil
}
