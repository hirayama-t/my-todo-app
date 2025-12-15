
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('業務用Todo管理アプリ', () => {
  test('初期表示で「タスクはありません」と表示される', () => {
    render(<App />);
    expect(screen.getByText('タスクはありません')).toBeInTheDocument();
  });

  test('タスクを追加するとリストに表示される', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('新しいタスクを入力');
    const button = screen.getByText('追加');
    fireEvent.change(input, { target: { value: 'テストタスク' } });
    fireEvent.click(button);
    expect(screen.getByText('テストタスク')).toBeInTheDocument();
  });

  test('空欄で追加しようとするとバリデーションメッセージが表示される', () => {
    render(<App />);
    const button = screen.getByText('追加');
    fireEvent.click(button);
    expect(screen.getByText('タスク内容を入力してください')).toBeInTheDocument();
  });
});
