// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/Azure/ARO-RP/pkg/proxy (interfaces: Dialer)

// Package mock_proxy is a generated GoMock package.
package mock_proxy

import (
	context "context"
	net "net"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockDialer is a mock of Dialer interface
type MockDialer struct {
	ctrl     *gomock.Controller
	recorder *MockDialerMockRecorder
}

// MockDialerMockRecorder is the mock recorder for MockDialer
type MockDialerMockRecorder struct {
	mock *MockDialer
}

// NewMockDialer creates a new mock instance
func NewMockDialer(ctrl *gomock.Controller) *MockDialer {
	mock := &MockDialer{ctrl: ctrl}
	mock.recorder = &MockDialerMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockDialer) EXPECT() *MockDialerMockRecorder {
	return m.recorder
}

// DialContext mocks base method
func (m *MockDialer) DialContext(arg0 context.Context, arg1, arg2 string) (net.Conn, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DialContext", arg0, arg1, arg2)
	ret0, _ := ret[0].(net.Conn)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// DialContext indicates an expected call of DialContext
func (mr *MockDialerMockRecorder) DialContext(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DialContext", reflect.TypeOf((*MockDialer)(nil).DialContext), arg0, arg1, arg2)
}
