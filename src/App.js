
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
    // タスク完了/未完了切り替え処理 
    const handleCompleteTask = (id) => {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    };

    // タスク削除処理
    const handleDeleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id));
    };
  // タスクの状態
  const [tasks, setTasks] = useState([]);
    // 初回マウント時にlocalStorageから読み込み
    useEffect(() => {
      const saved = localStorage.getItem('tasks');
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    }, []);

    // tasksが変わるたびにlocalStorageへ保存
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  // タスク追加処理
  const handleAddTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      setError('タスク内容を入力してください');
      return;
    }
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setInput('');
    setError('');
  };

  return (
    <div className="bg-primary min-vh-100 py-5">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="card shadow">
          <div className="card-body">
            <h1 className="card-title text-center mb-4 text-primary">業務用Todo管理アプリ</h1>
            <form className="row g-2 mb-3" onSubmit={handleAddTask}>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="新しいタスクを入力"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
              </div>
              <div className="col-3 d-grid">
                <button type="submit" className="btn btn-primary">追加</button>
              </div>
            </form>
            {error && <div className="alert alert-warning py-1 mb-2">{error}</div>}
            <ul className="list-group">
              {tasks.length === 0 ? (
                <li className="list-group-item text-center text-secondary">タスクはありません</li>
              ) : (
                tasks.map((task, idx) => (
                  <li key={task.id} className="list-group-item d-flex align-items-center justify-content-between">
                    <span className={task.completed ? 'completed flex-grow-1' : 'flex-grow-1'} style={task.completed ? { color: '#6c757d' } : {}}>
                      {task.text}
                    </span>
                    <button
                      className={task.completed ? 'btn btn-outline-secondary btn-sm ms-2' : 'btn btn-outline-success btn-sm ms-2'}
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      {task.completed ? '未完了' : '完了'}
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => handleDeleteTask(task.id)}
                    >削除</button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

// （不要なグローバル定義を削除）
}

export default App;
