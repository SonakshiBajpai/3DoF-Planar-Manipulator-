# 3-DoF Planar Manipulator Trajectory Tracking (LSPB)

This project implements a front-end dashboard for real-time trajectory tracking of a 3-DoF planar robotic manipulator using the Linear Segment with Parabolic Blend (LSPB) method.

The system accepts start pose, goal pose, and timing constraints as inputs. It generates smooth joint-space trajectories using LSPB, ensuring controlled acceleration, constant velocity motion, and smooth deceleration. The trajectory is computed in real time, and forward kinematics is applied to determine the end-effector position.

The manipulator motion is animated dynamically on the front end, with live visualization of joint movement and end-effector path tracking. The dashboard provides an interactive and intuitive interface for observing robotic trajectory planning and execution.
